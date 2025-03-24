import AdminLayout from '@/components/admin/layout/AdminLayout'
import Calendar from '@/components/admin/calendar/Calendar'
import React from 'react'

const page = () => {
  return (
    <div>
      <AdminLayout>
        <Calendar/>
      </AdminLayout>
    </div>
  )
}

export default page
