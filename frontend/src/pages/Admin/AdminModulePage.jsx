import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { adminModuleContent } from '../../data/adminModules'

function getStatusBadgeClasses(status) {
  if (status === 'Active') {
    return 'bg-green-100 text-green-700'
  }

  if (status === 'Low Stock') {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (status === 'Out of Stock') {
    return 'bg-red-100 text-red-700'
  }

  if (status === 'Offline') {
    return 'bg-slate-200 text-slate-700'
  }

  return 'bg-slate-100 text-slate-700'
}

const initialRetailers = [
  {
    id: 1,
    storeName: 'Sharma Kirana',
    ownerName: 'Rohit Sharma',
    phone: '9876543210',
    email: 'rohit.sharma@retailmail.com',
    city: 'Jaipur',
    address: 'MI Road, Jaipur',
    gstNumber: '08AAAPL1234A1Z5',
    status: 'Active',
    walletBalance: 'Rs 12,540',
  },
  {
    id: 2,
    storeName: 'Gupta Store',
    ownerName: 'Ankit Gupta',
    phone: '9898989898',
    email: 'ankit.gupta@retailmail.com',
    city: 'Delhi',
    address: 'Laxmi Nagar, Delhi',
    gstNumber: '07AACCG5678D1Z3',
    status: 'Pending',
    walletBalance: 'Rs 4,200',
  },
  {
    id: 3,
    storeName: 'Patel Mart',
    ownerName: 'Nilesh Patel',
    phone: '9811112233',
    email: 'nilesh.patel@retailmail.com',
    city: 'Ahmedabad',
    address: 'CG Road, Ahmedabad',
    gstNumber: '24AABCP3344E1Z8',
    status: 'Active',
    walletBalance: 'Rs 8,900',
  },
  {
    id: 4,
    storeName: 'Verma Traders',
    ownerName: 'Sandeep Verma',
    phone: '9777788899',
    email: 'sandeep.verma@retailmail.com',
    city: 'Lucknow',
    address: 'Aliganj, Lucknow',
    gstNumber: '09AAACV4455F1Z2',
    status: 'Blocked',
    walletBalance: 'Rs 0',
  },
  {
    id: 5,
    storeName: 'Singh Wholesale',
    ownerName: 'Harpreet Singh',
    phone: '9765432101',
    email: 'harpreet.singh@retailmail.com',
    city: 'Punjab',
    address: 'Model Town, Ludhiana',
    gstNumber: '03AABCS7788G1Z7',
    status: 'Active',
    walletBalance: 'Rs 15,300',
  },
]

const initialPartners = [
  {
    id: 1,
    name: 'Rahul Yadav',
    phone: '9810098100',
    email: 'rahul.yadav@deliverymail.com',
    city: 'Jaipur',
    vehicleType: 'Bike',
    vehicleNumber: 'RJ14 AB 4432',
    status: 'Active',
    totalDeliveries: 120,
    earnings: 'Rs 18,000',
  },
  {
    id: 2,
    name: 'Aman Khan',
    phone: '9890012300',
    email: 'aman.khan@deliverymail.com',
    city: 'Delhi',
    vehicleType: 'Cycle',
    vehicleNumber: 'DL CY 210',
    status: 'Offline',
    totalDeliveries: 80,
    earnings: 'Rs 9,500',
  },
  {
    id: 3,
    name: 'Rakesh Kumar',
    phone: '9876500011',
    email: 'rakesh.kumar@deliverymail.com',
    city: 'Ahmedabad',
    vehicleType: 'Bike',
    vehicleNumber: 'GJ01 TC 5544',
    status: 'Active',
    totalDeliveries: 200,
    earnings: 'Rs 25,000',
  },
  {
    id: 4,
    name: 'Suresh Meena',
    phone: '9755544332',
    email: 'suresh.meena@deliverymail.com',
    city: 'Lucknow',
    vehicleType: 'Bike',
    vehicleNumber: 'UP32 BT 1098',
    status: 'Active',
    totalDeliveries: 60,
    earnings: 'Rs 7,200',
  },
]

const retailerInitialForm = {
  storeName: '',
  ownerName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  gstNumber: '',
  status: 'Pending',
  walletBalance: 'Rs 0',
}

const partnerInitialForm = {
  name: '',
  phone: '',
  email: '',
  vehicleType: 'Bike',
  vehicleNumber: '',
  city: '',
  status: 'Active',
  totalDeliveries: 0,
  earnings: 'Rs 0',
}

function ModuleModal({ title, open, onClose, onSubmit, isReadOnly, children, accent = 'slate' }) {
  if (!open) {
    return null
  }

  const closeButtonClass =
    accent === 'emerald'
      ? 'rounded-lg border border-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50'
      : 'rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100'

  const saveButtonClass =
    accent === 'emerald'
      ? 'rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700'
      : 'rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white'

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-900/35 px-4">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.2)]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className={closeButtonClass}
          >
            Close
          </button>
        </div>

        <form className="mt-4 space-y-4" onSubmit={onSubmit}>
          {children}
          <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            >
              {isReadOnly ? 'Back' : 'Cancel'}
            </button>
            {!isReadOnly ? (
              <button type="submit" className={saveButtonClass}>
                Save
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  )
}

function baseInputClass(readOnly) {
  return `w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 ${
    readOnly ? 'cursor-default bg-slate-50' : ''
  }`
}

function AdminModulePage() {
  const { module } = useParams()
  const content = adminModuleContent[module]
  const isRetailerModule = module === 'retailers'
  const isDeliveryModule = module === 'delivery-partners'

  const [retailers, setRetailers] = useState(initialRetailers)
  const [partners, setPartners] = useState(initialPartners)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [selectedId, setSelectedId] = useState(null)
  const [retailerForm, setRetailerForm] = useState(retailerInitialForm)
  const [partnerForm, setPartnerForm] = useState(partnerInitialForm)

  if (!content) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const isReadOnly = modalMode === 'view'
  const nextRetailerId = (retailers.at(-1)?.id ?? 0) + 1
  const nextPartnerId = (partners.at(-1)?.id ?? 0) + 1

  const openRetailerModal = (mode, row = null) => {
    setModalMode(mode)
    setSelectedId(row?.id ?? null)
    setRetailerForm(row ?? retailerInitialForm)
    setIsModalOpen(true)
  }

  const openPartnerModal = (mode, row = null) => {
    setModalMode(mode)
    setSelectedId(row?.id ?? null)
    setPartnerForm(row ?? partnerInitialForm)
    setIsModalOpen(true)
  }

  const handleRetailerSubmit = (event) => {
    event.preventDefault()

    if (modalMode === 'edit') {
      setRetailers((prev) => prev.map((row) => (row.id === selectedId ? { ...retailerForm } : row)))
    } else {
      setRetailers((prev) => [...prev, { ...retailerForm, id: nextRetailerId }])
    }

    setIsModalOpen(false)
    setRetailerForm(retailerInitialForm)
    setSelectedId(null)
  }

  const handlePartnerSubmit = (event) => {
    event.preventDefault()

    if (modalMode === 'edit') {
      setPartners((prev) => prev.map((row) => (row.id === selectedId ? { ...partnerForm } : row)))
    } else {
      setPartners((prev) => [...prev, { ...partnerForm, id: nextPartnerId }])
    }

    setIsModalOpen(false)
    setPartnerForm(partnerInitialForm)
    setSelectedId(null)
  }

  const quickActions = content.quickActions ?? ['Create Policy', 'Export Report', 'View Audit Logs']

  if (isRetailerModule) {
    return (
      <div className="space-y-4">
        <header className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Retailer Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage onboarding, KYC, and retailer lifecycle</p>
          </div>
          <button
            type="button"
            onClick={() => openRetailerModal('add')}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            + Add Retailer
          </button>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h2 className="text-base font-semibold text-slate-900">Retailer Directory</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Store Name</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Owner</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Phone</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">City</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Status</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Wallet Balance</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {retailers.map((retailer) => (
                  <tr key={retailer.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-800">{retailer.storeName}</td>
                    <td className="px-3 py-3 text-slate-700">{retailer.ownerName}</td>
                    <td className="px-3 py-3 text-slate-700">{retailer.phone}</td>
                    <td className="px-3 py-3 text-slate-700">{retailer.city}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClasses(retailer.status)}`}>
                        {retailer.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-800">{retailer.walletBalance}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openRetailerModal('edit', retailer)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setRetailers((prev) => prev.filter((row) => row.id !== retailer.id))}
                          className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => openRetailerModal('view', retailer)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ModuleModal
          title={modalMode === 'add' ? 'Add Retailer' : modalMode === 'edit' ? 'Edit Retailer' : 'Retailer Details'}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRetailerSubmit}
          isReadOnly={isReadOnly}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Store Name">
              <input
                value={retailerForm.storeName}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, storeName: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="Owner Name">
              <input
                value={retailerForm.ownerName}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, ownerName: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="Phone Number">
              <input
                value={retailerForm.phone}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, phone: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={retailerForm.email}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, email: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="City">
              <input
                value={retailerForm.city}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, city: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="GST Number">
              <input
                value={retailerForm.gstNumber}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, gstNumber: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
              />
            </Field>
            <Field label="Address">
              <input
                value={retailerForm.address}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, address: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
              />
            </Field>
            <Field label="Status">
              <select
                value={retailerForm.status}
                onChange={(e) => setRetailerForm((prev) => ({ ...prev, status: e.target.value }))}
                disabled={isReadOnly}
                className={baseInputClass(isReadOnly)}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Blocked">Blocked</option>
              </select>
            </Field>
          </div>
        </ModuleModal>
      </div>
    )
  }

  if (isDeliveryModule) {
    return (
      <div className="space-y-4">
        <header className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <div>
            <h1 className="text-2xl font-semibold text-emerald-700">Delivery Partner Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage onboarding, delivery status, and partner productivity.</p>
          </div>
          <button
            type="button"
            onClick={() => openPartnerModal('add')}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            + Add Partner
          </button>
        </header>

        <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h2 className="text-base font-semibold text-emerald-800">Delivery Partner Directory</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-emerald-100 bg-emerald-50">
                <tr>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Name</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Phone</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">City</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Vehicle</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Status</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Total Deliveries</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Earnings</th>
                  <th className="px-3 py-2.5 font-semibold text-emerald-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-emerald-50/50">
                    <td className="px-3 py-3 font-medium text-slate-800">{partner.name}</td>
                    <td className="px-3 py-3 text-slate-700">{partner.phone}</td>
                    <td className="px-3 py-3 text-slate-700">{partner.city}</td>
                    <td className="px-3 py-3 text-slate-700">{`${partner.vehicleType} (${partner.vehicleNumber})`}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClasses(partner.status)}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-700">{partner.totalDeliveries}</td>
                    <td className="px-3 py-3 font-medium text-slate-800">{partner.earnings}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openPartnerModal('edit', partner)}
                          className="rounded-lg border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setPartners((prev) => prev.filter((row) => row.id !== partner.id))}
                          className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => openPartnerModal('view', partner)}
                          className="rounded-lg border border-emerald-200 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ModuleModal
          title={modalMode === 'add' ? 'Add Partner' : modalMode === 'edit' ? 'Edit Partner' : 'Partner Details'}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handlePartnerSubmit}
          isReadOnly={isReadOnly}
          accent="emerald"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <input
                value={partnerForm.name}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, name: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="Phone">
              <input
                value={partnerForm.phone}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, phone: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={partnerForm.email}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, email: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
                required
              />
            </Field>
            <Field label="Vehicle Type">
              <select
                value={partnerForm.vehicleType}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, vehicleType: e.target.value }))}
                disabled={isReadOnly}
                className={baseInputClass(isReadOnly)}
              >
                <option value="Bike">Bike</option>
                <option value="Cycle">Cycle</option>
              </select>
            </Field>
            <Field label="Vehicle Number">
              <input
                value={partnerForm.vehicleNumber}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, vehicleNumber: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
              />
            </Field>
            <Field label="City">
              <input
                value={partnerForm.city}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, city: e.target.value }))}
                readOnly={isReadOnly}
                className={baseInputClass(isReadOnly)}
              />
            </Field>
            <Field label="Status">
              <select
                value={partnerForm.status}
                onChange={(e) => setPartnerForm((prev) => ({ ...prev, status: e.target.value }))}
                disabled={isReadOnly}
                className={baseInputClass(isReadOnly)}
              >
                <option value="Active">Active</option>
                <option value="Offline">Offline</option>
              </select>
            </Field>
          </div>
        </ModuleModal>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-medium tracking-[-0.01em] text-slate-700">{content.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{content.subtitle}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        <h2 className="text-base font-semibold text-slate-900">Operational Modules</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {content.points.map((point) => (
            <article key={point} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
              {point}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
        <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button
              key={action}
              type="button"
              className={
                index === 0
                  ? 'rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white'
                  : 'rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700'
              }
            >
              {action}
            </button>
          ))}
        </div>
      </section>

      {content.topProducts ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h2 className="text-base font-semibold text-slate-900">Top Products</h2>
          <p className="mt-1 text-sm text-slate-500">High impact SKUs with margin and stock visibility.</p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Product Name</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Category</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Price</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Margin %</th>
                  <th className="px-3 py-2.5 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {content.topProducts.map((product) => (
                  <tr key={product.name} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-800">{product.name}</td>
                    <td className="px-3 py-3 text-slate-600">{product.category}</td>
                    <td className="px-3 py-3 font-medium text-slate-700">{product.price}</td>
                    <td className="px-3 py-3 text-slate-700">{product.margin}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadgeClasses(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {content.pricingInsights ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <h2 className="text-base font-semibold text-slate-900">Pricing Insights</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Avg Margin</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{content.pricingInsights.avgMargin}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Best Selling Category</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{content.pricingInsights.bestSellingCategory}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Low Stock Alerts</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{content.pricingInsights.lowStockAlerts}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active SKUs</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">{content.pricingInsights.activeSkus}</p>
            </article>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default AdminModulePage
