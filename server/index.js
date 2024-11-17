import express from 'express';
import dotenv from 'dotenv';
import NewsAPI from "newsapi";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import {PrismaClient} from '@prisma/client'

dotenv.config();
const app= express();
app.use(express.json());
app.use(cors());

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
export const prismaClient = new PrismaClient()

app.get('/health', (req, res)=> {
    res.send('Server is running');
});

app.get('/me', async (req, res)=> {
    const token= req.headers.authorization;
    if(!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const {email}= jwt.verify(token, process.env.JWT_SECRET);
        const user= await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            return res.status(404).send('User not found');
        }

        res.send(user);
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }
})

app.get('/news', async (req, res)=> {
    const news= await newsapi.v2.topHeadlines({
    
        language: 'en',
        country: 'us',
        pageSize: 20
      })

    res.send(news);
})

app.post('/login', async (req, res)=> {
    const {email, password}= req.body

    if(!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const existingUser = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    }) 

    console.log("existing user ", existingUser);

    if(!existingUser) {
        return res.status(404).send('User not found');
    }

    if(existingUser.password !== password) {
        return res.status(401).send('Invalid password');
    }

    const token= jwt.sign({email}, process.env.JWT_SECRET);

    res.send({token});
})

app.post('/signup', async (req, res)=> {
    const {email, username, password}= req.body;

    if(!email || !username || !password) {
        return res.status(400).send('Email, username and password are required');
    }

    const existingUser = await prismaClient.user.findFirst({
        where: {
            email: email
        }
    })
    console.log("existing user ", existingUser);
    if(existingUser) {
        return res.status(409).send('User already exists');
    }

    const newUser= await prismaClient.user.create({
        data: {
            email, username, password
        }
    })

    res.json({msg:"User created successfully"});
})

app.listen(3000, ()=> console.log('Server is running on port 3000'));