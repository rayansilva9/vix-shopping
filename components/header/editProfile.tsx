import React, { ReactNode, useContext, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { UserContext } from '../../context/userContext'
import { db } from '../../lib/firebase'
import { setCookie } from 'nookies'
// import { Cross2Icon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next'

type props = {
  children: ReactNode
}

type User = {
  username: string
  email: string
  photo: string
  number: string
  _id: string
  uid: string
}

const DialogDemo: React.FC<props> = ({ children }) => {
  const { setUser, user } = useContext(UserContext)
  const { t, i18n } = useTranslation()
  const [usuario, setUsuario] = useState<User>(user)

  async function updateProfile() {
    await db.collection('users').doc(user.doc).update(usuario)

    setCookie(undefined, 'US', JSON.stringify(usuario), {
      maxAge: 60 * 60 * 24 * 365 // 1 ano
    })
    setUser(usuario)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay z-[19]" />
        <Dialog.Content className="DialogContent z-[21]">
          <Dialog.Title className="DialogTitle">
            {' '}
            {t('header.editPefil.title')}
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {t('header.editPefil.description')}
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              {t('header.editPefil.name')}
            </label>
            <input
              type="text"
              onChange={({ target }) => {
                setUsuario(prev => {
                  return {
                    ...prev,
                    username: target.value
                  }
                })
              }}
              className="Input"
              id="name"
              defaultValue={user && user.username}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="Email">
              {t('header.editPefil.email')}
            </label>
            <input
              type="text"
              onChange={({ target }) => {
                setUsuario(prev => {
                  return {
                    ...prev,
                    email: target.value
                  }
                })
              }}
              className="Input"
              defaultValue={user && user.email}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="phoneNumber">
              {t('header.editPefil.phoneNumber')}
            </label>
            <input
              type="text"
              onChange={({ target }) => {
                setUsuario(prev => {
                  return {
                    ...prev,
                    number: target.value
                  }
                })
              }}
              className="Input"
              placeholder="73 98178-0874"
            />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button
                onClick={() => {
                  updateProfile()
                }}
                className="Button green"
              >
                {t('header.editPefil.btnSave')}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              {/* <Cross2Icon /> */}X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default DialogDemo
