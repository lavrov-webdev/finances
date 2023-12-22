import { appAxios } from "@/config";
import { TCreateSprintDto, TGetSprintWithEnvelopesDto, TEditSprintDto, TGetSprintDto, TGetSprintWithTotalSpendingsAndPlainDto, TGetSprintWithEnvelopesAndTransactionsDto } from ".";

export const SPRINTS_QUERY_KEY = "sprints";

export const createSprint = async (
  createSprintDto: TCreateSprintDto
): Promise<TGetSprintWithEnvelopesDto> => {
  const { data } = await appAxios.post<TGetSprintWithEnvelopesDto>(
    "/sprints",
    createSprintDto
  );
  return data;
};

export const editSprint = async ({
  editSprintDto,
  id,
}: {
  editSprintDto: TEditSprintDto;
  id: number;
}) => {
  const { data } = await appAxios.patch<TGetSprintDto>(
    `/sprints/${id}`,
    editSprintDto
  );
  return data;
};

export const getSprints = async (): Promise<
  TGetSprintWithTotalSpendingsAndPlainDto[]
> => {
  const { data } = await appAxios.get<
    TGetSprintWithTotalSpendingsAndPlainDto[]
  >("/sprints");
  return data;
};

export const getSprintById = async (
  id: number
): Promise<TGetSprintWithEnvelopesAndTransactionsDto> => {
  const { data } =
    await appAxios.get<TGetSprintWithEnvelopesAndTransactionsDto>(
      `/sprints/${id}`
    );
  return data;
};

export const getCurrentSprint = async (): Promise<Pick<TGetSprintDto, 'id'>> => {
  const { data } =
    await appAxios.get<Pick<TGetSprintDto, 'id'>>(
      `/sprints/current`
    );
  return data;
};

export const deleteSprint = async (id: number): Promise<TGetSprintDto> => {
  const { data } = await appAxios.delete<TGetSprintDto>(`/sprints/${id}`);
  return data;
};