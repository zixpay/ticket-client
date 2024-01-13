import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { generatePageService } from '@app/services/generate-page'

export const schema = z.object({
  token: z
    .string({ description: 'O token é obrigatório.' })
    .length(40, 'O token deve ter 40 dígitos.'),
  establishment: z.string({ description: 'O estabelecimento é obrigatório.' }),
})

export type GeneratePageParams = z.infer<typeof schema>

export const useGeneratePageController = () => {
  const [pageUrl, setPageUrl] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
  } = useForm<GeneratePageParams>({
    resolver: zodResolver(schema),
  })

  async function createPage(data: GeneratePageParams) {
    try {
      const response = await generatePageService.generatePage({
        establishment: data.establishment,
        token: data.token,
      })

      setPageUrl(response.page_url)
      toast.success('Página criada com sucesso!', {
        style: {
          border: '1px solid #22c55e',
          padding: '8px',
          width: 'auto',
          backgroundColor: '#F0fdf5',
        },
      })
    } catch {
      toast.error('Ocorreu um erro ao criar a página!', {
        style: {
          border: '1px solid #ef4444',
          padding: '8px',
          width: 'auto',
          backgroundColor: '#FEF2F2',
        },
      })
    }
  }

  const handleSubmit = hookFormSubmit(async (data) => {
    await createPage(data)
  })

  return {
    errors,
    pageUrl,
    register,
    handleSubmit,
  }
}
