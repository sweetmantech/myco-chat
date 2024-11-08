"use client";

import LandingPage from "@/components/LandingPage";
import { Suspense } from "react";

const Home = () => <Suspense fallback={<div />}><LandingPage /></Suspense>;

export default Home;
