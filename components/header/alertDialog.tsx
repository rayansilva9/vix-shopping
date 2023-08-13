import * as AlertDialog from '@radix-ui/react-alert-dialog'
import React, { ReactNode } from 'react'
import { destroyCookie } from 'nookies';

type props = {
  children: ReactNode
}

function LogOff() {
  destroyCookie(null, 'US');
  window.location.reload();
}

const AlertDialogDemo: React.FC<props> = ({ children }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay z-30" />
      <AlertDialog.Content className="AlertDialogContent z-[31]">
        <AlertDialog.Title className="AlertDialogTitle">
          Você tem certeza que deseja encerrar a sessâo?
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          .
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">Cancelar</button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button onClick={() => { LogOff() }} className="Button red">Sim, quero </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
)

export default AlertDialogDemo
