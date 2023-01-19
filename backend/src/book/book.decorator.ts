import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import Book from './book.entity'

const GetBook = createParamDecorator(
  (data, context: ExecutionContext): Book => {
    const gqlContext = GqlExecutionContext.create(context).getContext()
    return gqlContext.req.user
  },
)

class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext().req
  }
}

export { GetBook, GqlAuthGuard }
