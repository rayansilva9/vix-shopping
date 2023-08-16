import React, { useEffect, useMemo, useState } from 'react'

const useElementOnScreen = (options: {
  root: null,
  rootMargin: string,
  threshold: number
}, targetRef: React.MutableRefObject<any>) => {
  const [isVisibile, setIsVisible] = useState(false)

  const callbackFunction = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const optionsMemo = useMemo(() => {
    return options
  }, [options])

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo)
    const currentTarget = targetRef.current
    if (currentTarget) observer.observe(currentTarget)

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [targetRef, optionsMemo])

  return isVisibile
}

export default useElementOnScreen

