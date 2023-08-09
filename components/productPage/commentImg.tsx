import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import useElementOnScreen from '../../hooks/useElementOnScreen'

interface Props {
  img: string
  rounded: string
}
const ImgComments: React.FC<Props> = ({ img, rounded }) => {
  const [showPhoto, setShowPhoto] = useState(false)

  const CommentsRef = useRef(null)

  const options = {
    root: null,
    rootMargin: '1px 1px 400px 1px',
    threshold: 0.1
  }

  const photoCommentsVisible = useElementOnScreen(options, CommentsRef)
  useMemo(() => {
    if (photoCommentsVisible) {
      setShowPhoto(true)
    }
  }, [photoCommentsVisible])

  return (
    <Image
      style={{ animation: showPhoto && 'commentImg .3s linear', borderRadius: rounded, }}
      ref={CommentsRef}
      height={64}
      width={64}
      loading="lazy"
      className="mx-1 "
      src={showPhoto ? img != null ? img : '/emptyImg.jpg' : '/emptyImg.jpg'}
      alt="feedback img"
    />
  )
}

export default ImgComments
