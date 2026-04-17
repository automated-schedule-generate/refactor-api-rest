import {
  UniqueConstraintError,
  ValidationError,
  ForeignKeyConstraintError,
  DatabaseError,
  ConnectionError,
  ConnectionRefusedError,
  ConnectionTimedOutError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
  TimeoutError,
  OptimisticLockError,
  BulkRecordError,
  EagerLoadingError,
} from 'sequelize';
import { DomainException } from '../exceptions/domain-exception';

export function handleSequelizeError(error: any): DomainException {
  if (error instanceof UniqueConstraintError) {
    throw new DomainException(
      'Registry already Exists',
      'UNIQUE_CONSTRAINT_VIOLATION',
    );
  }

  if (error instanceof ValidationError) {
    throw new DomainException(
      'Erro de validação nos dados enviados',
      'VALIDATION_ERROR',
    );
  }

  if (error instanceof ForeignKeyConstraintError) {
    throw new DomainException(
      'Violação de chave estrangeira',
      'FOREIGN_KEY_VIOLATION',
    );
  }

  if (error instanceof OptimisticLockError) {
    throw new DomainException(
      'Conflito de atualização: o registro foi modificado por outro processo',
      'OPTIMISTIC_LOCK_ERROR',
    );
  }

  if (error instanceof BulkRecordError) {
    throw new DomainException(
      'Erro em um ou mais registros durante operação em massa',
      'BULK_RECORD_ERROR',
    );
  }

  if (error instanceof EagerLoadingError) {
    throw new DomainException(
      'Erro ao carregar associações do registro',
      'EAGER_LOADING_ERROR',
    );
  }

  if (error instanceof TimeoutError) {
    throw new DomainException(
      'Tempo limite da operação no banco de dados excedido',
      'DATABASE_TIMEOUT',
    );
  }

  if (error instanceof ConnectionRefusedError) {
    throw new DomainException(
      'Conexão com o banco de dados recusada',
      'CONNECTION_REFUSED',
    );
  }

  if (error instanceof ConnectionTimedOutError) {
    throw new DomainException(
      'Tempo limite de conexão com o banco de dados excedido',
      'CONNECTION_TIMED_OUT',
    );
  }

  if (error instanceof HostNotFoundError) {
    throw new DomainException(
      'Host do banco de dados não encontrado',
      'HOST_NOT_FOUND',
    );
  }

  if (error instanceof HostNotReachableError) {
    throw new DomainException(
      'Host do banco de dados inacessível',
      'HOST_NOT_REACHABLE',
    );
  }

  if (error instanceof InvalidConnectionError) {
    throw new DomainException(
      'Conexão inválida com o banco de dados',
      'INVALID_CONNECTION',
    );
  }

  if (error instanceof ConnectionError) {
    throw new DomainException(
      'Erro de conexão com o banco de dados',
      'CONNECTION_ERROR',
    );
  }

  if (error instanceof DatabaseError) {
    throw new DomainException(
      'Erro interno do banco de dados',
      'DATABASE_ERROR',
    );
  }

  throw new DomainException(
    'Erro desconhecido do banco de dados',
    'DATABASE_ERROR',
  );
}
