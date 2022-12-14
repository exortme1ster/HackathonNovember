// * Modules
import { useState, useEffect } from 'react'
import { supabase } from '../../../../helpers/supabaseServer'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// * Styles
import { Text, SpanText } from '../../../Platform/Data/Platform.styles'

// settings
const settings = ['Add CandyPoints', 'Sell CandyPoints', 'Wiew Candies']

function Profile({ handleOpen, user, isLoading }) {
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut()
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenClose = (func) => {
    func()
    handleCloseUserMenu()
  }

  const handleAddMoney = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    console.log(user.user_metadata.user_name)

    const { data, error } = await supabase
      .from('users')
      .update({ candy_points: 200 })
      .eq('username', user.user_metadata.user_name)

    console.log(error)
  }

  // settings
  const settings = [
    { name: 'Sell Candy', function: handleOpen },
    { name: 'Trade CandyPoints', function: handleAddMoney },
    { name: 'Deliveries', function: handleOpen },
  ]

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <AccountCircleIcon sx={{ fontSize: '52px', color: 'white' }} />
      </IconButton>
      <Menu
        sx={{ mt: '55px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="Name" disabled>
          {isLoading ? (
            <Text fontWeight="bold">Loading...</Text>
          ) : (
            <Text fontWeight="bold">{user.username}</Text>
          )}
        </MenuItem>
        <MenuItem key="Balance" disabled>
          {isLoading ? (
            <Text fontWeight="bold">Loading...</Text>
          ) : (
            <Text fontWeight="bold">
              Balance: <SpanText>{user.candy_points} CP</SpanText>
            </Text>
          )}
        </MenuItem>
        {settings.map((setting) => (
          <MenuItem key={setting.name} onClick={() => handleOpenClose(setting.function)}>
            <Text>{setting.name}</Text>
          </MenuItem>
        ))}
        <MenuItem key="Logout" onClick={handleLogOut}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile
