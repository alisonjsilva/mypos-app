'use client'
import { CalendarForm } from '@/components/CalendarForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { use, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface TransactionProps {
    date: string;
    original_amount: number;
    original_currency: string;
    pan: string;
    terminal_id: string;
}

export default function Transactions() {

    const [transactions, setTransactions] = useState<TransactionProps[]>([])
    const [terminalId, setTerminalId] = useState<string>('all')
    const [total, setTotal] = useState<number>(0)
    console.log(transactions)
    const transactionsFiltered = terminalId !== 'all' ? transactions?.filter((transaction) => transaction.terminal_id == terminalId) : transactions
    const totalFiltered = transactionsFiltered?.reduce((acc, transaction) => acc + transaction.original_amount, 0)
    useEffect(() => {
        setTotal(totalFiltered)
    }, [transactionsFiltered, totalFiltered])

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className='mb-8'>Transações Fabius Barbershop</CardTitle>
                <CalendarForm setTransactions={setTransactions} />
            </CardHeader>

            <div className='my-6 ml-6'>
                <Select key={"terminal_id"} onValueChange={setTerminalId}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Loja" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="90362841">Cascais</SelectItem>
                        <SelectItem value="90381857">Oeiras</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <CardContent>
                {
                    transactionsFiltered?.length > 0 &&
                    <Card className='mb-4'>
                        <CardHeader>
                            <CardTitle>
                                Total: € {total}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                }
                {
                    transactionsFiltered?.length > 0 ?
                        transactionsFiltered
                            ?.map((transaction, index) => {
                                const transactionDate = new Date(transaction.date);
                                const formattedDate = `${transactionDate.toLocaleDateString('pt')} ${transactionDate.toLocaleTimeString('pt')}`;
                                return (
                                    <Card key={index} className='py-2 mb-4'>
                                        <CardHeader>
                                            <CardTitle>
                                                {transaction.original_amount} {transaction.original_currency}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {formattedDate}
                                            <div className='flex flex-row items-center'>
                                                Cartão: {transaction.pan}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            }) : <div className='text-center'>Nenhuma transação encontrada</div>
                }
            </CardContent>
        </Card >
    )
}