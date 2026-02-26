import * as React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FilledInput from '@mui/material/FilledInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { getUser } from '../auth'
import api from '../api/axios'

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    filiere: '',
    groupe: '',
    password: '',
  })

  useEffect(() => {
    const user = getUser()
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        role: user.role || '',
        filiere: user.filiere || '',
        groupe: user.groupe || '',
        password: '',
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const user = getUser()
      const updateData = { ...formData }
      if (!updateData.password) delete updateData.password

      const res = await api.put(`/users/${user.id}`, updateData)
      
      // update localStorage with new data
      localStorage.setItem('user', JSON.stringify({
        ...user,
        fullName: res.data.fullName,
        email: res.data.email,
        role: res.data.role,
        filiere: res.data.filiere,
        groupe: res.data.groupe,
      }))

      alert('Profile updated successfully')
    } catch (error) {
      console.error(error)
      alert('Server error')
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => event.preventDefault()
  const handleMouseUpPassword = (event) => event.preventDefault()

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <Navbar />
      <h1 style={{ fontFamily: 'ariel' }}>Votre Profile</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', pl: 25, pt: 3 }}>
        <div>
          <TextField
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Nom</InputAdornment>,
              },
            }}
          />
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ m: 1, width: '70ch' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Email</InputAdornment>,
              },
            }}
          />
          <TextField
            name="filiere"
            value={formData.filiere}
            onChange={handleChange}
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Filière</InputAdornment>,
              },
            }}
          />
          <TextField
            name="groupe"
            value={formData.groupe}
            onChange={handleChange}
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Groupe</InputAdornment>,
              },
            }}
          />
        </div>
        <div>
          <TextField
            name="role"
            value={formData.role}
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">Role</InputAdornment>,
                readOnly: true,
              },
            }}
          />
          <FormControl sx={{ m: 1, width: '40ch' }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </Box>
      <Stack spacing={2} direction="row" ml={25} mt={3}>
        <Button variant="contained" onClick={handleSubmit}>Modifier</Button>
        <Button variant="outlined">Annuler</Button>
      </Stack>
    </div>
  )
}