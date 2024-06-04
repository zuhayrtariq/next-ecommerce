import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { resolve } from "path";


const wait = async(duration : number) =>{
    return new Promise(resolve=>setTimeout(resolve,2000))
}

async function getSalesData() {
    await wait(2000);
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

const getCustomerData = async() =>{

    const [customerCount,orderData] = await Promise.all(
        [
            db.customer.count(),
            db.order.aggregate({
                _sum : {pricePaidInCents: true}
            })
        ]
    )
    return {
        customerCount,
        averageValuePerCustomer: customerCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / customerCount / 100
    }
}  


const getProductData = async() =>{
    const [activeCount,inactiveCount] = await Promise.all([
        db.product.count({where: {
            isAvailableForPurchase: true
        }}),

        db.product.count({
            where: {
                isAvailableForPurchase: false
            }
        })

    ])
    return {activeCount,inactiveCount}
    
}

export default async function AdminDashboard() {
  
    const [salesData,customerData,productData] = await Promise.all(
        [
            getSalesData(),
            getCustomerData(),
            getProductData()
        ]
    )
  
   
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subTitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={`${formatCurrency(salesData.amount)}`}
      />
      <DashboardCard
        title="Customers"
        subTitle={`${formatCurrency(customerData.averageValuePerCustomer)} Average Value`}
        body={`${formatNumber(customerData.customerCount)}`}
      />
       <DashboardCard
        title="Sales"
        subTitle={`${formatNumber(productData.activeCount)} Inactive`}
        body={`${formatNumber(productData.inactiveCount)}`}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subTitle: string;
  body: string;
};

function DashboardCard({ title, subTitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title} </CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>

      <CardContent>{body}</CardContent>
    </Card>
  );
}
