"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";


export function ProductForm() {

    const [error, action] = useFormState(addProduct,{})
    const [priceInCents,setPriceInCents] = useState<number>()
    return (
        <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">
            Name
            </Label>
            <Input type="text" id="name" name="name" required/>
            {error.name && <p className="text-destructive">{error.name}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">
            Price In Cents
            </Label>
            <Input type="number" id="priceInCents" name="priceInCents" required
            value={priceInCents}
            onChange={e=>setPriceInCents(Number(e.target.value) || undefined)}
            />
             {error.priceInCents && <p className="text-destructive">{error.priceInCents}</p>}
        </div>

        <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
        </div>

        <div className="space-y-2">
            <Label htmlFor="description">
            Description
            </Label>
            <Textarea  id="description" name="description" required/>
            {error.description && <p className="text-destructive">{error.description}</p>}
        </div>

        <div className="space-y-2">
            <Label htmlFor="file">
            File
            </Label>
            <Input type="file" id="file" name="file" required/>
            {error.file && <p className="text-destructive">{error.file}</p>}
        </div>

        <div className="space-y-2">
            <Label htmlFor="image">
            Image
            </Label>
            <Input type="file" id="image" name="image" required/>
            {error.image && <p className="text-destructive">{error.image}</p>}
        </div>
        <div className="flex items-end justify-end">
        <SubmitButton/>
        </div>
        </form>
    );
}
const SubmitButton = () =>{
    const {pending} = useFormStatus()
    return <Button type="submit"  disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}