import { memo } from 'react'
import { beneficios } from '../../schemas/home/beneficos'

const SectionBeneficios: React.FC = () => {
  return (
    <>
      <section
        style={{ overflowX: 'scroll' }}
        className="sct-beneficios  no-scrollbar bg-white my-3 py-5 rounded-xl flex justify-center w-full"
      >
        <ul className="w-full whitespace-nowrap px-3 py-4 flex md:justify-center items-center gap-5">
          {beneficios.map((item: { label: JSX.Element, title: string, content: string }, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-3xl">{item.label}</span>
              <div>
                <p className="text-xs text-gray-600 font-medium"><strong>{item.title}</strong></p>
                <p className="text-xs text-gray-600 font-medium">{item.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default memo(SectionBeneficios)
