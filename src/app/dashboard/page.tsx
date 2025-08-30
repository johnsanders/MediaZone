import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Box, Typography, Button, Container, Paper } from '@mui/material'
import { LogoutOutlined } from '@mui/icons-material'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'grey.300',
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Welcome to MediaZone!
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Hello, {user.email}! You're successfully logged in.
          </Typography>
          <form action={handleSignOut}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<LogoutOutlined />}
              size="large"
            >
              Sign Out
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}
