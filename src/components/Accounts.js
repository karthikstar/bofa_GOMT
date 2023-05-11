import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Form from './Form'
import TradeProcessingEngine from './TradeProcessingEngine'
import PendingApprovalTable from './PendingApprovalTable'

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [role, setRole] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  // const [pendingArray, setPendingArray] = useState(null)

  useEffect(() => {
    getProfile()
    // getPending()
  }, [session])

  async function getPending() {
        
    const data = {user: user}

    const JSONdata = JSON.stringify(data);

    try {
        const response = await fetch('/api/getPending', {
          method: 'POST',
          body: JSONdata,
        })
  
        const payload = await response.json()

        if (response.ok) {
          // Handle successful form submission
          console.log('chk:',payload.data.data)
          setPendingArray(payload.data.data)
          return payload.data.data;
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error:', error);
      }

}

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, role, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setRole(data.role)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, role, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        role,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='account-page'>
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <input
          id="role"
          type="url"
          value={role || ''}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, role, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
    <Form user = {user.email}></Form>
    <TradeProcessingEngine user = {user.email}></TradeProcessingEngine>
    <PendingApprovalTable ></PendingApprovalTable>
    </div>
  )
}

