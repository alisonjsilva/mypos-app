import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
    // const formData = new FormData();
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    console.log(startDate, endDate);
    const form = {
        'grant_type': 'client_credentials',
    }

    const requestToken = await fetch(`https://auth-api.mypos.com/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${process.env.MYPOS_CLIENT_ID}:${process.env.MYPOS_SECRET}`).toString('base64')}`
        },
        body: new URLSearchParams(form)
    })

    console.log(requestToken);

    const requestTokenResult = await requestToken.json()
    const accessToken = requestTokenResult.access_token

    /**
     * ---------
     */

    const formData = new FormData();
    const form2 = {
        'from_date': `${startDate}`,
        'to_date': `${endDate}`,
        'size': '100',
        'transaction_types': '013'
    }

    let url = new URL('https://transactions-api.mypos.com/v1.1/transactions');
    url.search = new URLSearchParams(form2).toString();

    const requestTransactions = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'API-Key': `${process.env.MYPOS_CLIENT_ID}`,
            'X-Request-ID': '232465ab-66ea-4776-b3f0-f7a123f988e4w'
        }
    })

    const requestTransactionsResult = await requestTransactions.json()

    return NextResponse.json({ requestTransactionsResult })
}