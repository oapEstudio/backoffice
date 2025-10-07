import React from 'react'
import {
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper
} from '@mui/material'
import H6 from '../H6/H6'
import { colors } from '../../../common/colors'

export interface ItemList {
  id: number | string
  value: string,
  obj: any
}

// helpers para conjuntos de ItemList
function not(a: ItemList[], b: ItemList[]) {
  return a.filter(x => !b.includes(x))
}
function intersection(a: ItemList[], b: ItemList[]) {
  return a.filter(x => b.includes(x))
}

interface DualListProps {
  checked: ItemList[]
  setChecked: React.Dispatch<React.SetStateAction<ItemList[]>>
  left: ItemList[]
  setLeft: React.Dispatch<React.SetStateAction<ItemList[]>>
  right: ItemList[]
  setRight: React.Dispatch<React.SetStateAction<ItemList[]>>
  titleLeft: string
  titleRight: string
}

export const DualList: React.FC<DualListProps> = ({
  checked, setChecked,
  left, setLeft,
  right, setRight,
  titleLeft, titleRight
}) => {
  const leftChecked  = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (item: ItemList) => () => {
    const currentIndex = checked.indexOf(item)
    const newChecked = [...checked]
    if (currentIndex === -1) newChecked.push(item)
    else newChecked.splice(currentIndex, 1)
    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setRight([...right, ...left])
    setLeft([])
  }
  const handleCheckedRight = () => {
    setRight([...right, ...leftChecked])
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }
  const handleCheckedLeft = () => {
    setLeft([...left, ...rightChecked])
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }
  const handleAllLeft = () => {
    setLeft([...left, ...right])
    setRight([])
  }

  const customList = (items: ItemList[], title: string) => (
    <>
      <H6 style={{color: colors.palette.primary.main}}>{title}</H6>
      <Paper sx={{ width: '100%', height: 230, overflow: 'auto' }}>
        <List dense component="div" role="list" style={{borderRight: '5px solid #EEEEEE', borderTop: '1px solid #EEEEEE'}}>
          {items.map(item => {
            const labelId = `transfer-list-item-${item.id}-label`
            return (
              <ListItemButton
                key={item.id}
                role="listitem"
                onClick={handleToggle(item)}
                style={{borderBottom: '2px solid #EEEEEE'}}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.includes(item)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.value} />
              </ListItemButton>
            )
          })}
        </List>
      </Paper>
    </>
  )

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" >
      <Grid size={{xs:5}}>
        {customList(left, titleLeft)}
      </Grid>

      <Grid >
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            sx={{ my: 0.5 }}
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            sx={{ my: 0.5 }}
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            sx={{ my: 0.5 }}
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            sx={{ my: 0.5 }}
          >
            ≪
          </Button>
        </Grid>
      </Grid>

      <Grid size={{xs:5}}>
        {customList(right, titleRight)}
      </Grid>
    </Grid>
  )
}
