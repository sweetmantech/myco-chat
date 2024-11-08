"use client";

import HistoryPage from "@/components/HistoryPage";
import { Suspense } from "react";

const History = () => <Suspense fallback={<div />}><HistoryPage /></Suspense>;

export default History;
