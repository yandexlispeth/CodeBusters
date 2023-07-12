import * as Pages from '@/pages'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import AuthWrapper from './AuthWrapper'

export default createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthWrapper />}>
      <Route path="/" element={<Pages.RootContainer />}>
        <Route path="sign-in" element={<Pages.AuthPage />} />
        <Route path="sign-up" element={<Pages.AuthPage />} />
        <Route index element={<Pages.HomePage />} />
        <Route path="play" element={<Pages.PlayPage />} />
        <Route path="leader-board" element={<Pages.LeaderBoardPage />} />
        <Route path="forum" element={<Pages.ForumPage />} />
        <Route path="forum/:topicId" element={<Pages.ForumTopicPage />} />
        <Route path="profile" element={<Pages.ProfilePage />} />
        <Route path="end-game" element={<Pages.EndGamePage />} />
        <Route
          path="500"
          element={
            <Pages.ErrorPage
              topMessage={'Извините, у нас ремонт'}
              bottomMessage={'Но совсем скоро мы его закончим'}
            />
          }
        />
        <Route
          path="*"
          element={
            <Pages.ErrorPage
              topMessage={'Упс..'}
              bottomMessage={'Такой страницы не существует'}
            />
          }
        />
      </Route>
    </Route>
  )
)
