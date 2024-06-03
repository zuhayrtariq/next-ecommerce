import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";

async function getSalesData(){
    const data = await db.order.aggregate({
         _sum : {pricePaidInCents : true},
         _count : true
     })
     return {
         amount : (data._sum.pricePaidInCents || 0)/100,
         numberOfSales : data._count
     }
 }

export default async function AdminDashboard(){
    const salesData = await getSalesData()
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

       <DashboardCard title="Sales" subTitle={salesData.numberOfSales} body={salesData.amount}/>
    </div>
}

type DashboardCardProps ={
    title : string,
    subTitle : string,
    body : string
}


function DashboardCard({title,subTitle,body} : DashboardCardProps){
    return <Card>
    <CardHeader>
        <CardTitle>
        {title} </CardTitle>
        <CardDescription>
        {subTitle}
    </CardDescription>
       
        </CardHeader>
        
    
    <CardContent>
        {body}
    </CardContent>
</Card>
}