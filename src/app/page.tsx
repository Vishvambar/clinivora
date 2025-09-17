import { FormProvider } from '@/contexts/FormContext'
import ClinicalForm from '@/components/ClinicalForm'

export default function Home() {
  return (
    <FormProvider>
      <ClinicalForm />
    </FormProvider>
  )
}