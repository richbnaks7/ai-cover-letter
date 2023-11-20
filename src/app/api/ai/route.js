import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET });

export async function POST(req) {
    const body = await req.text();
    console.log(body);
    const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `This is my Resume. ${body.resume}. This is the job description. ${body.jobDescription}. Write a cover letter.`
    });
    const responseData = completion.choices[0].text;

    const response = new NextResponse(JSON.stringify(responseData), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response;
}