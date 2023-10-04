import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateOrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
    private prismaService = new PrismaClient()


    getOrganizations(){
        return this.prismaService.organization.findMany({

        })
    }


    async create(createOrganizationDto: CreateOrganizationDto) {
        return this.prismaService.organization.create({
          data: createOrganizationDto,
        });
      }
}
