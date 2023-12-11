import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom'

const Valikko = (props) => {
  return (
    <>
      <Drawer variant="permanent" sx={{ bgcolor: "#D4EBEC" }}>
        <Box sx={{ p: 2 }}>
          
        </Box>
        <List sx={{ width: 200, fontSize: 18 }}>
          <ListItem>
            <ListItemIcon>
              <ListItemText></ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={'/tietoa'} sx={{ borderRadius: '0 25px 25px 0' }}>
              <ListItemText primary="Tietoa" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={'/'} sx={{ borderRadius: '0 25px 25px 0' }}>
              <ListItemText primary="Etusivu" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={'/kokoelmat'} sx={{ borderRadius: '0 25px 25px 0' }} onClick={() => props.setLaskuri(props.laskuri + 1)}>
              <ListItemText primary="Kokoelmat" />
            </ListItemButton>
          </ListItem>
          {props.kirjautumisToken && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to={'/omakokoelma'} sx={{ borderRadius: '0 25px 25px 0' }} onClick={() => props.setLaskuri(props.laskuri + 1)}>
                <ListItemText primary="Oma kokoelma" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
        <Typography variant="body2" sx={{ p: 2 }}>Kirja-arkisto © 2023</Typography>
      </Drawer>
    </>
  )
}

export { Valikko }