import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { TreeItem, treeItemClasses } from '@mui/lab'
import { Box, Chip, Theme } from '@mui/material'
import React from 'react'

import { FileItem } from '@/store/workflowGetters'

interface Props {
  items: FileItem[]
}

const FileTreeItems: React.VFC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {props.items.map((item) => {
        return (
          <TreeItem
            children={
              item.children ? <FileTreeItems items={item.children} /> : null
            }
            key={item.id}
            label={
              <Box sx={{ alignItems: 'center', display: 'flex', my: 0.5 }}>
                {item.itemType === 'file' ? (
                  <InsertDriveFileOutlinedIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: 18,
                    }}
                  />
                ) : (
                  <FolderOutlinedIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: 18,
                    }}
                  />
                )}
                <Box children={item.label} sx={{ ml: 2 }} />
                {item.type === 'primary' ? (
                  <Chip
                    color='primary'
                    label='Primary Workflow'
                    size='small'
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 400,
                      ml: 2,
                    }}
                  />
                ) : null}
              </Box>
            }
            nodeId={item.id}
            sx={(theme: Theme) => ({
              my: 0.5,
              [`.${treeItemClasses.content}`]: {
                '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
                  bgcolor:
                    item.itemType === 'file'
                      ? theme.palette.secondary.light
                      : null,
                  [`.${treeItemClasses.label}`]: {
                    fontWeight: 600,
                  },
                },
                borderRadius: theme.spacing(0.5),
              },
            })}
          />
        )
      })}
    </React.Fragment>
  )
}

export default React.memo(FileTreeItems)