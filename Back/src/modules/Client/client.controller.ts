import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('client')
@Controller('client')
export class ClientController {}