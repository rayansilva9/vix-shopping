import { Divider } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import ImgComments from './commentImg'
import { formatDistance } from 'date-fns'
import { SlArrowRight } from 'react-icons/sl'
import { processLink } from '../../functions/fixLinksImg'
import CustomizedRating from '../rating'
import ptBR from 'date-fns/locale/pt-BR'

interface Props {
  produto: { feedback: []; rating: number }
}

const SectionComments: React.FC<Props> = ({ produto }) => {
  const [commentsHeight, setCommentsHeight] = useState<string | number>('auto')
  const [commentsLength, setCommentsLength] = useState(4)

  const ExpandComments = useCallback(() => {
    setCommentsLength(prev => prev + 4)
  }, [commentsLength])

  function hiddeComments() {
    if (commentsHeight == 'auto') {
      setCommentsHeight('200px')
    } else {
      setCommentsHeight('auto')
    }
  }

  return (
    <>
      {' '}
      <section
        style={{
          height: commentsHeight,
          overflow: 'hidden',
          transition: 'all .5s linear'
        }}
        id="avaliaçoes"
        className="lg:w-[calc(100vw-216px)] md:w-[calc(100vw-216px)]  w-[94%] rounded-lg bg-white mb-16 mt-5 mx-auto"
      >
        <div className="pb-7 relative flex flex-col items-center rounded-lg">
          <div className="self-start px-3 lg:px-7 mt-5 w-full">
            <div className="flex items-center flex-col lg:flex-row justify-between">
              <div className="flex flex-1 items-center mb-[30px] w-full justify-between">
                <p className="font-medium lg:text-[25px] self-start">AVALIAÇÔES</p>
                <SlArrowRight
                  style={{
                    transform: `rotate(${commentsHeight == 'auto' ? '270deg' : '90deg'})`,
                    transition: 'transform 0.3s linear'
                  }}
                  onClick={() => {
                    hiddeComments()
                  }}
                  className="rotate-90 relative -left-1 lg:hidden"
                />
              </div>
              <div className="w-full lg:hidden">
                <Divider sx={{ mb: '20px', display: { sm: 'inline', lg: 'none' } }} />
                <button className="w-full lg:w-[200px] py-2  transition-colors flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-lg text-black font-medium">
                  <p className="text-md text-white">Avaliar este produto</p>
                </button>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 w-full hidden lg:flex lg:w-[200px] py-2 transition-colors  items-center justify-center gap-2 rounded-md text-lg text-white font-medium">
                <p className="text-md">Avaliar este produto</p>
              </button>
            </div>

            <Divider sx={{ mt: '40px' }} />
          </div>
          <div className="rounded mb-8 self-start bg-white flex gap-2 py-5 px-5">
            <div className="-lg p-2 flex flex-col gap-3 ">
              <p className="text-7xl">{produto.rating}</p>
              <CustomizedRating tamanho={'medium'} mt={'2px'} val={produto.rating} />
              <div className="py-2 lg:px-0 bg-white rounded-lg">
                <p>{produto.feedback.length + 1} avaliaram este produto</p>
              </div>
            </div>
          </div>
          <hr />
          <div className='w-full'>
            {produto.feedback.slice(0, commentsLength).map(
              (
                comment: {
                  buyer: {
                    buyerCountry: string
                    buyerGender: string
                    buyerImage: string
                    buyerTitle: string
                  },
                  reviewContent: string,
                  review: {
                    itemLogistics: string
                    itemSpecInfo: string
                    reviewAdditional: any
                    reviewAnonymous: boolean
                    reviewContent: string
                    reviewDate: string
                    reviewHelpFulNo: boolean
                    reviewHelpFulYes: boolean
                    reviewId: number
                    reviewImages: string[]
                    reviewStarts: number
                  }
                },
                i
              ) => (
                <div
                  key={i}
                  className={` ${i == 0 && 'rounded-t-lg'}
        ${i == produto.feedback.length - 1 && 'rounded-b-lg'}
        py-5 px-5 w-full bg-white`}
                >
                  <div className="flex items-center gap-2">
                    <ImgComments height={46} width={46} rounded='50%' img={processLink(comment.buyer.buyerImage)} />
                    <div className="flex flex-col">
                      <p className='font-semibold'>{comment.buyer.buyerTitle} <span className='font-normal'>adquiriu o:{' '}</span>  </p>
                      <span className="text-[13px] font-medium"> {comment.review.itemSpecInfo}</span>
                    </div>
                  </div>
                  <div className="mb-3">

                    <br />
                    <p className="inline font-normal text-xs">
                      há{' '}
                      {formatDistance(Date.parse(comment.review.reviewDate), new Date(), {
                        locale: ptBR
                      })}{' '}
                      atrás
                    </p>
                  </div>
                  <CustomizedRating
                    tamanho={'medium'}
                    mt={'2px'}
                    val={comment.review.reviewStarts}
                  />
                  <p className="mt-3 mb-2">{comment.reviewContent}</p>
                  <ul className="flex gap-2">
                    {comment.review.reviewImages !== null && comment.review.reviewImages.map((src, index) => (
                      <li key={index}>
                        <ImgComments height={64} width={64} rounded='0px' img={src !== null && processLink(src)} />
                      </li>
                    ))}
                  </ul>

                  <Divider sx={{ mt: '40px' }} />
                </div>
              )
            )}
          </div>
          <SlArrowRight
            onClick={() => {
              ExpandComments()
            }}
            className={`absolute ${commentsLength >= produto.feedback.length ? 'hidden' : 'inline'
              } rotate-90 left-1/2 bottom-0`}
          />
        </div>
      </section>

    </>
  )
}

export default memo(SectionComments)
