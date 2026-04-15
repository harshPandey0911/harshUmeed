import { Navigate } from 'react-router-dom'

function RequireAdminAuth({ children }) {
  const isAdminAuthenticated = localStorage.getItem('umeed-admin-auth') === 'true'

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/auth" replace />
  }

  return children
}

export default RequireAdminAuth
