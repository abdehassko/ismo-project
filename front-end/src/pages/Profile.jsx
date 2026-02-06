import * as React from 'react'
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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function InputAdornments() {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
          <Navbar></Navbar>
          <h1 style={{ fontFamily: "ariel" }}>Votre Profile</h1>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', pl: 25 , pt: 3}}>
      <div>
        <TextField

          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">Nom</InputAdornment>,
            },
          }}
        />
        <TextField
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">Prénom</InputAdornment>,
            },
          }}
        />

        <TextField

          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">Filiére</InputAdornment>,
            },
          }}
        />

        <TextField

          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">Groupe</InputAdornment>,
            },
          }}
        /> <br />

         <TextField

          id="outlined-start-adornment"
          sx={{ m: 1, width: '70ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">Email</InputAdornment>,
            },
          }}
        />
      
        
      </div>
      <div>
        <TextField

          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">Role</InputAdornment>,
            },
          }}
        />
        <FormControl sx={{ m: 1, width: '40ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
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
    <Stack spacing={2} direction="row" ml= {25} mt= {3}>
      <Button variant="contained">Modifier</Button>
      <Button variant="outlined">Annuler</Button>
    </Stack>
    </div>
  )
}