// Toutes les opérations CRUD sont centralisées ici.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, options)
  } catch {
    throw new Error('Connexion impossible à JSON Server. Vérifiez que npm run api est lancé.')
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Offre introuvable (404).')
    }
    throw new Error(`Erreur du serveur (${response.status}).`)
  }

  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export const getJobs = () => request('/jobs')
export const getJob = (id) => request(`/jobs/${encodeURIComponent(id)}`)

export const createJob = (job) => request('/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(job)
})

export const updateJob = (id, job) => request(`/jobs/${encodeURIComponent(id)}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(job)
})

export const deleteJob = (id) => request(`/jobs/${encodeURIComponent(id)}`, {
  method: 'DELETE'
})
