"use client"
import { BookOpenIcon, UserCircleIcon } from '@heroicons/react/16/solid'
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'
import { Card, CardBody } from '@heroui/card'
import React, { useEffect, useState } from 'react'
import BarChart from '../chart/BarChart'
import PieChart from '../chart/PieChart'
import { countAppointments, totalIncome } from './Action'

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [income, setIncome] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await countAppointments();
        setData(response.count);
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await totalIncome();
        setIncome(response.sum);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Card Counts */}
      <div className="flex justify-center gap-4 items-center">
        <Card className="w-96 p-5 flex items-center" shadow='sm'>
          <CardBody>
            <div className="flex items-center space-x-5">
              <UserCircleIcon className="w-16 text-amber-600" />
              <div>
                <span className="font-bold text-lg">Total bookings</span>
                <h1 className="text-2xl">{data !== null ? data : "Loading..."}</h1>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="w-96 p-5 flex items-center" shadow='sm'>
          <CardBody>
            <div className="flex items-center space-x-5">
              <ArrowTrendingUpIcon className="w-16 text-amber-600" />
              <div>
                <span className="font-bold text-lg">Total Income</span>
                <h1 className="text-2xl">{income !== null ? income : "Loading..."}</h1>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>


      <div className="flex justify-center">
        <Card shadow="sm" className="w-full sm:w-1/2 p-2 mt-2 overflow-hidden">
          <CardBody>
            <BarChart />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
