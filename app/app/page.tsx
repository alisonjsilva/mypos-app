'use client'
import { CalendarForm } from '@/components/CalendarForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'
import { BiLogIn } from 'react-icons/bi'

export interface TransactionProps {
  date: string;
  original_amount: number;
  original_currency: string;
  pan: string;
  terminal_id: string;
}

export default function Home() {
  // const [transactions, setTransactions] = useState<TransactionProps[]>([])
  // const [total, setTotal] = useState<number>(0)
  // console.log(transactions)
  // const transactionsFiltered = transactions?.filter((transaction) => transaction.terminal_id == '90381857')
  // const totalFiltered = transactionsFiltered?.reduce((acc, transaction) => acc + transaction.original_amount, 0)
  // useEffect(() => {
  //   setTotal(totalFiltered)
  // }, [transactionsFiltered, totalFiltered])


  return (
    <main className="flex flex-col p-5 items-center justify-center">
      Fabius Barbershop
      <LoginLink className='flex gap-2 items-center'>
        <BiLogIn /> Login
      </LoginLink>
      {/* <Card className='w-full'>
        <CardHeader>
          <CardTitle className='mb-8'>Transações Fabius Barbershop</CardTitle>
          <CalendarForm setTransactions={setTransactions} />
        </CardHeader>
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
      </Card > */}
    </main >
  )
}
