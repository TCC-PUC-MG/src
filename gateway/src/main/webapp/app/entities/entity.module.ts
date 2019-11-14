import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'mina-extracao',
        loadChildren: () => import('./mina-extracao/mina-extracao.module').then(m => m.GatewayMinaExtracaoModule)
      },
      {
        path: 'barragem',
        loadChildren: () => import('./barragem/barragem.module').then(m => m.GatewayBarragemModule)
      },
      {
        path: 'sensor',
        loadChildren: () => import('./sensor/sensor.module').then(m => m.GatewaySensorModule)
      },
      {
        path: 'sensor-leitura',
        loadChildren: () => import('./sensor-leitura/sensor-leitura.module').then(m => m.GatewaySensorLeituraModule)
      },
      {
        path: 'evento-barragem',
        loadChildren: () => import('./evento-barragem/evento-barragem.module').then(m => m.GatewayEventoBarragemModule)
      },
      {
        path: 'evento-risco',
        loadChildren: () => import('./evento-risco/evento-risco.module').then(m => m.GatewayEventoRiscoModule)
      },
      {
        path: 'risco-barragem',
        loadChildren: () => import('./risco-barragem/risco-barragem.module').then(m => m.GatewayRiscoBarragemModule)
      },
      {
        path: 'localidade',
        loadChildren: () => import('./localidade/localidade.module').then(m => m.GatewayLocalidadeModule)
      },
      {
        path: 'nivel-seguranca',
        loadChildren: () => import('./nivel-seguranca/nivel-seguranca.module').then(m => m.GatewayNivelSegurancaModule)
      },
      {
        path: 'nivel-situacao',
        loadChildren: () => import('./nivel-situacao/nivel-situacao.module').then(m => m.GatewayNivelSituacaoModule)
      },
      {
        path: 'ocorrencias',
        loadChildren: () => import('./ocorrencias/ocorrencias.module').then(m => m.GatewayOcorrenciasModule)
      },
      {
        path: 'tipo-alerta',
        loadChildren: () => import('./tipo-alerta/tipo-alerta.module').then(m => m.GatewayTipoAlertaModule)
      },
      {
        path: 'alerta-orgao',
        loadChildren: () => import('./alerta-orgao/alerta-orgao.module').then(m => m.GatewayAlertaOrgaoModule)
      },
      {
        path: 'orgao-governo',
        loadChildren: () => import('./orgao-governo/orgao-governo.module').then(m => m.GatewayOrgaoGovernoModule)
      },
      {
        path: 'alerta-enviados',
        loadChildren: () => import('./alerta-enviados/alerta-enviados.module').then(m => m.GatewayAlertaEnviadosModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GatewayEntityModule {}
