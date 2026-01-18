// seeder.js

import mongoose from 'mongoose'
import { Bundlecoupon } from '../models/couponModel.js'
import dotenv from 'dotenv'
dotenv.config()


const seedBundles = async () => {
    try {
        await mongoose.connect(process.env.MONGO_uri)
        const bundles = [
            // Silver Tier
            {
                name: "Silver Starter Pack",
                tier: "Silver",
                price: 499,
                validity: 20,
                quantity: 15,
                description: "Perfect for beginners or casual users. Includes 15 entries over 20 days with full access to all Silver-tier gyms. Includes essential cardio and strength equipment, locker facilities, and clean workout zones."
            },
            {
                name: "Silver Standard Bundle",
                tier: "Silver",
                price: 899,
                validity: 40,
                quantity: 30,
                description: "Ideal for building a consistent fitness routine. Offers 30 entries over 40 days with complete access to Silver-tier gyms and their core facilities like strength equipment, cardio areas, and showers."
            },
            {
                name: "Silver Power Pack",
                tier: "Silver",
                price: 1499,
                validity: 75,
                quantity: 60,
                description: "Tailored for regular gym-goers. 60 entries in 75 days with full Silver-tier gym access, including weights, machines, and basic locker room facilities."
            },

            // Gold Tier
            {
                name: "Gold Lite Plan",
                tier: "Gold",
                price: 699,
                validity: 25,
                quantity: 15,
                description: "Affordable access to a broader range of gyms. Includes 15 visits in 25 days with full access to both Gold-tier and Silver-tier gyms. Enjoy premium cardio machines, strength zones, locker rooms, and select group classes."
            },
            {
                name: "Gold Plus Bundle",
                tier: "Gold",
                price: 1299,
                validity: 50,
                quantity: 30,
                description: "Perfect for fitness enthusiasts. 30 entries in 50 days with complete access to Gold and Silver-tier gyms. Facilities include steam rooms, premium equipment, functional zones, and instructor-led sessions."
            },
            {
                name: "Gold Elite Access",
                tier: "Gold",
                price: 2299,
                validity: 80,
                quantity: 60,
                description: "Premium access for frequent users. 60 redemptions over 80 days with full access to all Gold and Silver gyms, including advanced training areas, spa showers, and all non-exclusive wellness services."
            },

            // Platinum Tier
            {
                name: "Platinum Trial Bundle",
                tier: "Platinum",
                price: 899,
                validity: 30,
                quantity: 10,
                description: "Experience luxury fitness. Includes 10 redemptions over 30 days with full access to Platinum, Gold, and Silver-tier gyms. Gain access to exclusive training equipment, recovery zones, and optional personal trainer consultations."
            },
            {
                name: "Platinum Standard Pack",
                tier: "Platinum",
                price: 2599,
                validity: 60,
                quantity: 30,
                description: "Comprehensive mid-term plan. 30 entries in 60 days with full access to all Platinum, Gold, and Silver gyms. Enjoy spa access, saunas, massage chairs, nutrition advice, and high-end strength zones."
            },
            {
                name: "Platinum Supreme Access",
                tier: "Platinum",
                price: 4599,
                validity: 90,
                quantity: 60,
                description: "The most luxurious fitness bundle. 60 visits over 90 days with unlimited access to Platinum, Gold, and Silver-tier gyms. Includes personal coaching, relaxation lounges, hydrotherapy, exclusive classes, and concierge fitness services."
            }
        ];

        await Bundlecoupon.deleteMany({});
        await Bundlecoupon.insertMany(bundles);
        console.log("Bundle coupons added");


    } catch (err) {
        console.error("Seeder error:", err)
    } finally {
        await mongoose.disconnect()
        console.log("db disconnected")
        process.exit();
    }
}

seedBundles()