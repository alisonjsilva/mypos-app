"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { pt } from 'date-fns/locale';
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Dispatch, SetStateAction, useState } from "react"
import { TransactionProps } from "@/app/page"

const FormSchema = z.object({
    dob: z.date({
        required_error: "É necessário selecionar uma data",
    }),
})

async function getTransactions(startDate: Date, endDate: Date) {
    const response = await fetch(
        `/api/transactions?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    )
    const data = await response.json()

    return data
}

interface CalendarFormProps {
    setTransactions: Dispatch<SetStateAction<TransactionProps[]>>
}

export function CalendarForm({ setTransactions }: CalendarFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const [date, setDate] = React.useState<Date>()
    const [loading, setLoading] = React.useState(false)

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true);
        const startDate = new Date(data.dob);
        const endDate = new Date(data.dob);
        startDate.setHours(2);
        endDate.setHours(24);
        console.log(startDate.toISOString(), endDate.toISOString());
        const transactionsResult = await getTransactions(startDate, endDate);
        setTransactions(transactionsResult.requestTransactionsResult.transactions);
        setLoading(false);

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data dos movimentos:</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "dd/MM/yyyy")
                                            ) : (
                                                <span>Selecione a data</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        locale={pt}
                                        selected={field.value}
                                        onSelect={(date) => field.onChange(date as Date)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Selecione a data para ver as transações
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>
                    {loading &&
                        (
                            <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Aguarde</>
                        ) || "Submeter"
                    }
                    
                </Button>
            </form>
        </Form>
    )
}
