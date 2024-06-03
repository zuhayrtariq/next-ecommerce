import { Nav, NavLink } from "@/components/Nav";
import { ReactNode } from "react";

export default function AdminLayout({children} : Readonly<{children: ReactNode}>){
    return <>
    <Nav>
    <NavLink href={'/admin'}>
            Dashboard
        </NavLink>
        <NavLink href={'/admin/products'}>
            Dashboard
        </NavLink>
        <NavLink href={'/admin/customers'}>
            Customers
        </NavLink>
        <NavLink href={'/admin/orders'}>
            Sales
        </NavLink>
       
    </Nav>
    <div className="container my-6">
        {children}
    </div>
    </>

}