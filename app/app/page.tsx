'use client'
import { CalendarForm } from '@/components/CalendarForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'

export interface TransactionProps {
  date: string;
  original_amount: number;
  original_currency: string;
  pan: string;
  terminal_id: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])
  console.log(transactions)


  return (
    <main className="">
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='mb-8'>Transações Fábius</CardTitle>
          <CalendarForm setTransactions={setTransactions} />
        </CardHeader>
        <CardContent>
          {
            transactions?.filter((transaction) => transaction.terminal_id == '90381857')
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
                      <div className='flex flex-row items-center'>
                        {transaction.terminal_id}
                      </div>
                    </CardContent>
                  </Card>
                )
              }) || <div className='text-center'>Nenhuma transação encontrada</div>
          }
        </CardContent>
      </Card >
    </main >
  )
}
