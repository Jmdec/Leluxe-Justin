import Dashboard from '@/components/admin/dashboard/Dashboard'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import React from 'react'

const page = () => {
  return (
    <div>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </div>
  )
}

export default page
