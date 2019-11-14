import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { LocalidadeDetailComponent } from 'app/entities/localidade/localidade-detail.component';
import { Localidade } from 'app/shared/model/localidade.model';

describe('Component Tests', () => {
  describe('Localidade Management Detail Component', () => {
    let comp: LocalidadeDetailComponent;
    let fixture: ComponentFixture<LocalidadeDetailComponent>;
    const route = ({ data: of({ localidade: new Localidade('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LocalidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LocalidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localidade).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
