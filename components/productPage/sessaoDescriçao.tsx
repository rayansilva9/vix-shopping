import { Divider } from '@mui/material'
import { useEffect, useRef, memo } from 'react'
import { useTranslation } from 'react-i18next'
type props = {
  productDescription: string
}

const SectionDescricao: React.FC<props> = ({ productDescription }) => {
  const { t } = useTranslation()
  const sectionDesc = useRef(null)

  useEffect(() => {
    if (!sectionDesc.current) return
    function descToCode() {
      sectionDesc.current.innerHTML = productDescription
      const parentElement = document.getElementById('#desc')
      const allDescendants = parentElement.querySelectorAll('*')
      allDescendants.forEach(el => {
        let haveClass = el.getAttribute('class')
        if (haveClass) {
          return
        } else {
          let attrVal = el.getAttribute('classname' || 'className' || 'class')
          el.removeAttribute('classname' || 'className')
          el.setAttribute('class', attrVal)
        }
      })
    }

    descToCode()
  }, [sectionDesc.current])

  return (
    <>
      <section>
        <div className="lg:w-[calc(100vw-216px)] md:w-[calc(100vw-216px)] py-7 px-3 lg:px-7  w-[94%] rounded-lg bg-white mb-16 mt-5 mx-auto">
          <p className="font-medium lg:text-[25px] self-start">
            {t('productPage.productDescription')}
          </p>
          <Divider sx={{ mt: '40px', mb: '10px' }} />
          <div ref={sectionDesc} id="#desc" className="lg:w-[700px] select-none"></div>
        </div>
      </section>
    </>
  )
}

export default memo(SectionDescricao)
