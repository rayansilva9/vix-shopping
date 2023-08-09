import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  openedMenu: boolean
  funcOpen?: Function
}

const MenuMobile: React.FC<Props> = ({ openedMenu, funcOpen }) => {
  return <div style={{ transition: 'all .3s ease', transform: openedMenu ? 'translateX(0)' : 'translateX(-100vw)', }} className='h-screen w-screen fixed left-0 top-0 z-40 bg-white'>
    <AiOutlineClose onClick={(event: React.MouseEvent) => funcOpen()} style={{ fontSize: '2.2rem', margin: '10px 0 ', color: 'black', }} />
    <div className='flex flex-col gap-1'>
      {openedMenu && (
        <>
          <div style={{ animation: 'item-menu 1s ease', }} className='py-3 px-2 bg-slate-300 '>
            <p>Home</p>
          </div>
          <div style={{ animation: 'item-menu 1s ease' }} className='py-3 px-2 bg-slate-300 '>
            <p>Home</p>
          </div>
          <div style={{ animation: 'item-menu 1s ease' }} className='py-3 px-2 bg-slate-300 '>
            <p>Home</p>
          </div>
          <div style={{ animation: 'item-menu 1s ease' }} className='py-3 px-2 bg-slate-300 '>
            <p>Home</p>
          </div>
        </>
      )}

    </div>
  </div >
}

export default React.memo(MenuMobile);