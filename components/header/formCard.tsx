import React, { ReactNode } from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import AlertDialogDemo from './alertDialog'
import DialogDemo from './editProfile'
import { useTranslation } from 'react-i18next'

type props = {
  children: ReactNode
}

const HoverCardDemo: React.FC<props> = ({ children }) => {
  const { t, i18n } = useTranslation()

  return (
    <HoverCard.Root openDelay={300}>
      <HoverCard.Trigger className="relative flex items-center gap-3" asChild>
        {children}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent z-[5]" sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <DialogDemo>
              <p className="select-none cursor-pointer">
                {t('header.hoverPerfil.editPefil')}
              </p>
            </DialogDemo>
            <AlertDialogDemo>
              <p className="text-red-500 font-semibold select-none cursor-pointer">
                {t('header.hoverPerfil.logOff')}
              </p>
            </AlertDialogDemo>
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default HoverCardDemo
