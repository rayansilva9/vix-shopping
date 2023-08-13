import * as AlertDialog from '@radix-ui/react-alert-dialog'
import React, { ReactNode } from 'react'

type props = {
  children: ReactNode
}

const ModalOrderBy: React.FC<props> = ({ children }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay z-30" />
      <AlertDialog.Content className="AlertDialogContent z-[31]">
        <AlertDialog.Title className="AlertDialogTitle">
          Para Qual Deseja Ordenar?
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">Cancelar</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={() => { }} className="Button red">Sim, quero </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default ModalOrderBy
