using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _dataContext.Activities.FindAsync(request.Id);

                if (activity == null) return null;

                _dataContext.Remove(activity);

                var result = await _dataContext.SaveChangesAsync() > 0;
                // SaveChangesAsync returns the number of state entries written to the database. 
                // We check that the number of changes is greater than 0.

                if (!result) return Result<Unit>.Failure("Failed to delete the activity.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}