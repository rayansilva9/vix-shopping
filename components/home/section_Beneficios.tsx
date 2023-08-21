import { memo } from 'react'
import { beneficios } from '../../schemas/home/beneficos'
import { useTranslation } from 'react-i18next'
const SectionBeneficios: React.FC = () => {
  const { t } = useTranslation()

  function GET_STRING(index: number) {
    switch (index) {
      case 0:
        return 'main.benefits.freeShipping'
        break
      case 1:
        return 'main.benefits.buyWhatsapp'
        break
      case 2:
        return 'main.benefits.exclusive offers'
        break
      case 3:
        return 'main.benefits.x'
        break

      default:
        break
    }
  }

  return (
    <>
      <section
        style={{ overflowX: 'scroll' }}
        className="sct-beneficios select-none  no-scrollbar bg-white my-3 py-5 rounded-xl flex justify-center w-full"
      >
        <ul className="w-full whitespace-nowrap px-3 py-4 flex md:justify-center items-center gap-5">
          {beneficios.map(
            (item: { label: JSX.Element; title: string; content: string }, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-3xl">{item.label}</span>
                <div>
                  <p className="text-xs text-gray-600 font-medium">
                    <strong>{t(`${GET_STRING(i)}.title`)}</strong>
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    {t(`${GET_STRING(i)}.content`)}
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
      </section>
    </>
  )
}

export default memo(SectionBeneficios)
