import type { IPaginatedResponse } from "../../../../application/common/IPaginatedResponse"
import type { IMenu } from "../../../../domain/entities/IMenu"

export const Mock:IPaginatedResponse<IMenu> = {
    "data": [
        {
            "id": "e2e71f8c-63da-475c-9bce-0f53c7fd90cd",
            "name": "item1",
            "description": "item1",
            "itemStatusId": 2,
            "itemStatusDescription": "Activo",
            "parentId": null,
            "link": "",
            "hasLink": false,
            "orderIndex": 1,
            "hierarchyIndex": 0,
            "canBeHighlighted": true,
            "isHighlighted": false,
            "profiles": [
               
            ],
            "children": []
        },
        {
            "id": "75caa623-ccb2-45f9-a6fe-393d550a67a3",
            "name": "prb",
            "description": "prb",
            "itemStatusId": 2,
            "itemStatusDescription": "Activo",
            "parentId": null,
            "link": "",
             "hasLink": false,
            "orderIndex": 1,
            "hierarchyIndex": 0,
            "canBeHighlighted": false,
            "isHighlighted": false,
            "profiles": [
                
            ],
            "children": [
                {
                    "id": "11e65350-ee92-4184-9cb6-f169f5528d83",
                    "name": "prb hijo",
                    "description": "prb hijo desc",
                    "itemStatusId": 2,
                    "itemStatusDescription": "Activo",
                    "parentId": "75caa623-ccb2-45f9-a6fe-393d550a67a3",
                    "link": "www.goog.com",
                     "hasLink": true,
                     "orderIndex": 1,
                    "hierarchyIndex": 2,
                    "canBeHighlighted": true,
                    "isHighlighted": false,
                    "profiles": [
                       
                    ],
                    "children": []
                }
            ]
        },
        {
            "id": "1db8a321-cc25-446f-afd4-4110d76e801f",
            "name": "item1",
            "description": "item",
            "itemStatusId": 1,
            "itemStatusDescription": "Nuevo",
            "parentId": null,
            "link": "www.google.com.ar",
             "hasLink": true,
            "orderIndex": 1,
            "hierarchyIndex": 0,
            "canBeHighlighted": true,
            "isHighlighted": false,
            "profiles": [
               
            ],
            "children": []
        },
        {
            "id": "d0554ad1-510a-48c5-b1df-aeef425907c0",
            "name": "hijo prueba",
            "description": "",
            "itemStatusId": 1,
            "itemStatusDescription": "Nuevo",
            "parentId": null,
            "link": "",
             "hasLink": false,
            "orderIndex": 1,
            "hierarchyIndex": 0,
            "canBeHighlighted": true,
            "isHighlighted": false,
            "profiles": [],
            "children": []
        },
        {
            "id": "11e65350-ee92-4184-9cb6-f169f5528d83",
            "name": "prb hijo",
            "description": "prb hijo desc",
            "itemStatusId": 2,
            "itemStatusDescription": "Activo",
            "parentId": "75caa623-ccb2-45f9-a6fe-393d550a67a3",
            "link": "www.goog.com",
             "hasLink": true,
            "orderIndex": 1,
            "hierarchyIndex": 2,
            "canBeHighlighted": true,
            "isHighlighted": false,
            "profiles": [
               
            ],
            "children": []
        },
        {
            "id": "f5b1f954-6165-451e-b650-f75b6c4a7bed",
            "name": "pruebaBrian",
            "description": "",
            "itemStatusId": 1,
            "itemStatusDescription": "Nuevo",
            "parentId": null,
            "link": "",
             "hasLink": false,
            "orderIndex": 1,
            "hierarchyIndex": 0,
            "canBeHighlighted": true,
            "isHighlighted": false,
            "profiles": [],
            "children": []
        }
    ],
    "count": 6,
    "parameters": {
        "sortBy": "null",
        "page": 1,
        "pageSize": 1000,
        "sortDescending": true
    }
}