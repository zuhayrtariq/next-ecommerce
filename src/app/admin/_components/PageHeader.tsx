import { ReactNode } from "react"


const PageHeader = ({children} : {children: ReactNode}) => {
  return (
    <h1 className="text-4xl font-bold mb-4">{children}</h1>
  )
}

export default PageHeader