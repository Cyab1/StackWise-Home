import Sidebar from './Sidebar'

export default function AppLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--sw-bg)' }}>
      <Sidebar />
      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', background: 'var(--sw-bg)' }}>
        {children}
      </main>
    </div>
  )
}