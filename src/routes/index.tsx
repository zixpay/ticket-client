import { Routes as BrowserRoutes, Route } from 'react-router-dom'

import { Checkout } from '@views/pages/checkout'
import { Feedback } from '@views/pages/feedback'
import { Home } from '@views/pages/home'
import { Payment } from '@views/pages/payment'
import { GeneratePage } from '@views/pages/generate-page'
import { HomeFeedbackLayout } from '@views/layouts/home-feedback'

export const Routes = () => {
  return (
    <BrowserRoutes>
      <Route path="/generate-page" element={<GeneratePage />} />
      <Route element={<HomeFeedbackLayout />}>
        <Route path="/:id" element={<Home />} />
      </Route>
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
    </BrowserRoutes>
  )
}
